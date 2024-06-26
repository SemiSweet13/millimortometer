from flask import Blueprint, request, jsonify
from datetime import datetime
import re
from Statistics.statistics import MilliMortProcesses


# Create a Blueprint for the API routes
api_blueprint = Blueprint('api', __name__)

def check_payload(data):
    #checks to see if there is any values missing in the payload,  i.e. age = '' time = null etc
    keys_to_check = ['Age', 'Time', 'Gender', 'Day', 'Month']
    # Iterate through the keys to check each one
    for key in keys_to_check:
        # Check if the key is not in data, or value is None, or value is an empty string
        if key not in data or data[key] is None or data[key] == '':
            return {"status": "FAILURE", "message": f"Missing or invalid value for '{key}'"}
    # If all checks pass, return None or a success message/dict
    # Custom age check
    if 'Age' in data:
        try:
            age = int(data['Age'])  # Ensure age is an integer
            if age < 17 or age > 120:
                return {"status": "Age FAILURE", "message": "Age must be between 17 and 120"}
        except ValueError:
            # This catches cases where the age value is not an integer
            return {"status": "Age FAILURE", "message": "Invalid age format"}

    return None    



def break_down_basic_payload(data):
    """
    Takes in a list
    Return Format will look like
    ['19', '2024-03-12T23:15:00.000Z', 'Male', 'Monday', 'January']
    Loop through data and pick on the singular value keys
    """
    info_keys = ['Age', 'Time', 'Gender', 'Day', 'Month']  # Basic information keys
    basic_list = [data[key] for key in info_keys]
    print(basic_list)
    return basic_list

def break_down_direction_payload(direction_data):
    '''
    #Loop through each direction given to the user and remove all non-neccesary keys
    #Atm the keys are type,distance,tome,road,direction,index,mode,modifier,text,exit
    #out of these we only want Distance and Text
    #distance is length of instruction in Meters
    #Text is the direciton string, will tell road type (R, L, N, M)
    '''
    #result will be of the format
    # [ {'text': 'Head northeast on Royal Meadows', 'distance': 11.1},
    # {'text': 'Turn left onto The Avenue', 'distance': 266.8},
    # {'text': 'Turn right onto Molly Ware Street (R125)', 'distance': 336.1},
    # {'text': 'Turn right onto The Harbour (R148)', 'distance': 869.6},
    # {'text': 'Make a slight right onto R148', 'distance': 4237.5},
    # {'text': 'Continue straight onto Kilcock Road (R148)', 'distance': 521} ]
    
    route_array = direction_data['Route']
    filtered_route_array = [{'text': item['text'], 'distance': item['distance']} for item in route_array]
    for direction in filtered_route_array:
        print(direction)
    return filtered_route_array

def split_road_types(data) :
    '''
    function strips the string into the specified road type on the direction
    if road type is not mentioned the string is not striped
    removes the bracket from the string as well

    returns a filtered route list
    '''
    # Compile a regular expression to find road types
    road_type_regex = re.compile(r'\b(?:L|R|N|M)\d+\b|\((?:L|R|N|M)\d+\)')
    for direction in data:
    # Search for road type in the 'text'
        match = road_type_regex.search(direction['text'])
        if match:
            # If a road type is found, replace the 'text' with the road type
            # Removing parentheses if they exist
            direction['text'] = match.group().strip("()")
    # If no road type is found, leave the 'text' unchanged
    # Print results to verify
   # print('Printing filtered road type direction array')
    # for direction in data:
    #     print(direction)
    return data

def round_distance(num):
    #Make into kilometers
    num /= 1000
    #round to two decimal places
    num = round(num, 2)
    return num

def format_time(time):
    timestamp = time
    # Parse the timestamp into a datetime object
    dt_object = datetime.strptime(timestamp, "%Y-%m-%dT%H:%M:%S.%fZ")
    # Format the datetime object to only get hours and minutes
    hours_minutes = dt_object.strftime("%H:%M")
    print(hours_minutes)  # This will print "23:15"
    return hours_minutes

def get_millimort(basic_data_array, journey_distance):
    ''' Get the calculation for
        1) General fatality rate per Km driven as base
        2) Age and Gender of person
        3) Time of Day, Day, and Month
        
        Uses MiliMortProcesses to get figures
    
        Returns: a number which is the millimort of the journey
    '''
    #format time string to be in hr:min e.g. 23:15, 00:01, 15:28
    time_str = format_time(basic_data_array[1])
    statisticalProcessor = MilliMortProcesses()
    fatal_rate_per_km = statisticalProcessor.calculate_fatalities_per_km()
    age_contribution = statisticalProcessor.get_age_calculation(int(basic_data_array[0])) / 100
    time_contribution = statisticalProcessor.get_time_frame_calculation(time_str) / 100
    gender_contribution = statisticalProcessor.get_gender_calculation(basic_data_array[2]) / 100
    day_contribution = statisticalProcessor.get_day_calculation(basic_data_array[3]) /100 
    month_contribution = statisticalProcessor.get_month_calculation(basic_data_array[4]) /100
    print('INSIDE GET MILLIMORT FUNCTION')
    print('Rate per Km travlled: '"{:.25f}".format(fatal_rate_per_km))
    print('Age figure based on age of:',basic_data_array[0], age_contribution)
    print('Gender fig based on gender:', basic_data_array[2], gender_contribution)
    print('Day figure based on day:', basic_data_array[3],day_contribution)
    print('Month fig based on month:',basic_data_array[4],month_contribution)
    print('Time fig based on time:',time_str,time_contribution)
    journey_fatal_rate = fatal_rate_per_km * journey_distance
    print('Fatal rate per journey: '"{:.25f}".format(journey_fatal_rate))
    print('Fatal rate per journey as millimort: '"{:.25f}".format(journey_fatal_rate * 1000000))

    millimort = journey_fatal_rate * month_contribution * day_contribution * gender_contribution * time_contribution * age_contribution
    millimort *= 1000000000
    # Print the millimort rate
    print("Adjusted Fatal Rate Per Journey:", millimort)
    print("Adjusted Fatal Rate Per Journey: {:.25f}".format(millimort))
    figures = {
        'journey_fatal_rate': journey_fatal_rate,
        'journey_fatal_rate_millimort': journey_fatal_rate*1000000,
        'age_rate_contribution': age_contribution,
        'time_rate_contribution': time_contribution,
        'gender_rate_contribution': gender_contribution,
        'day_rate_contribution': day_contribution,
        'month_rate_contribution': month_contribution,
        'millimort': millimort,
    }
    return figures

@api_blueprint.route('/api/sentdata', methods=['POST'])
def receive_data():
    data = request.json
    #inital check for request
    if data:
        # Copy data to avoid modifying the original
        data_without_route = data.copy()
        # Remove the 'Route' key to not consider it in the check as Route has a defualt and will never be none/null 
        data_without_route.pop('Route', None)
        # Check if all other fields are empty or null
        if all(not value for value in data_without_route.values()):
            return jsonify({"status": "FAILURE", "message": "No User Data in Payload"}), 400
    else:
        # If data is None or not present
        return jsonify({"status": "FAILURE", "message": "No Data in Payload"}), 400
    #check keys for missing info
    err_msg = check_payload(data) 
    if err_msg != None:
        return jsonify(err_msg)

    filtered_basic_data = break_down_basic_payload(data)
    filtered_route_array = break_down_direction_payload(data)
    filtered_roads = split_road_types(filtered_route_array)
    print('printing filtered routes in main')
    for direction in filtered_roads:
        print(direction)       
    #same regex
    road_type_regex = re.compile(r'\b(?:L|R|N|M)\d*\b|\((?:L|R|N|M)\d*\)')
    # Initialize variables for road type
    l_road_distance = 0.0 # L road distance
    n_road_distance = 0.0 # N road distance
    m_road_distance = 0.0 # M road distance
    r_road_distance = 0.0 # R road distance
    gen_road_distance = 0.0 #If a road type is not specified
    total_road_distance = 0.0 #Total distance journey
    ##will loop throught the filtered_roads to get each road type distance
    for road in filtered_roads:
        text = road['text']
        distance = road['distance']
         # Try to find a road type in the text
        match = road_type_regex.search(text)
        if match:
            road_type = match.group().strip("()")[0]  # Get the first character, which is the road type
            if road_type == 'L':
                l_road_distance += distance
            elif road_type == 'N':
                n_road_distance += distance
            elif road_type == 'M':
                m_road_distance += distance
            elif road_type == 'R':
                r_road_distance += distance
        else:
            # If no specific road type is mentioned, add to general road distance
            gen_road_distance += distance
        total_road_distance += distance
    # Print results
    l_road_distance = round_distance(l_road_distance)
    r_road_distance = round_distance(r_road_distance)
    n_road_distance = round_distance(n_road_distance)
    m_road_distance = round_distance(m_road_distance)
    gen_road_distance = round_distance(gen_road_distance)
    total_road_distance = round_distance(total_road_distance)
    # print(f"L road distance: {l_road_distance} km")
    # print(f"N road distance: {n_road_distance } km")
    # print(f"M road distance: {m_road_distance } km")
    # print(f"R road distance: {r_road_distance } km")
    # print(f"General road distance: {gen_road_distance } km")
    # print(f"Total road distance: {total_road_distance } km")
    millimort_results = get_millimort(filtered_basic_data, total_road_distance)
    print(millimort_results)
    millimort = millimort_results['millimort'] 
    print('Milimort:', millimort, "decimal notation: {:.25f}".format(millimort))

    print("Content-Type:", request.headers.get('Content-Type'))  
    response = [
    {"status": "success", "message": "Data received successfully"},
    millimort_results
    ]
    return jsonify(response)  
    #return jsonify({"status": "success", "message": "Data received successfully"})


