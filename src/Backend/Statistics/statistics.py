'''
    Author: Jack Malone
    Last Modified Date: 17/03/2024
    
    A class for processing and analyzing millimort data from an Excel file.    
    This class is designed to load, process, and analyze data related to mortality statistics
    across different dimensions such as time of day, month, age, and gender. It provides
    methods to load data from specified sheets within an Excel workbook, calculate specific
    statistics like fatalities per kilometer driven, and retrieve data based on demographic segments.

    Note:
        Ensure that the Excel file path provided to the class constructor is correct and that
        the Excel file is structured as expected by the class methods.

    Methods:
        __init__(self, excel_path='Statistics/Millimort_Data.xlsx'):
            Initializes the class instance, setting the path to the Excel data source and
            automatically loading data from it.

        read_excel_sheet(self, sheet_index):
            Reads an Excel sheet by its index and returns a DataFrame.

        load_data(self):
            Loads data from specified Excel sheets into the class attributes for further processing.

        print_figures(self):
            Prints the dataframes loaded into the class attributes, useful for debugging and verification.

        calculate_fatalities_per_km(self):
            Calculates and returns the rate of fatalities per kilometer based on loaded data.

        get_age_calculation(self, age):
            Returns the statistical figure associated with a given age by locating it within
            predefined age segments.

        get_day_figure(self, day):
            Retrieves the figure associated with the given day of the week.

        get_month_figure(self, month):
            Retrieves the figure associated with the given month.

        get_time_frame_figure(self, time_str):
            Determines the statistical figure associated with a specific time, given in 'HH:MM' format,
            by matching it to defined time frames.

        get_gender_calculation(self, gender):
            Returns the figure associated with the specified gender.

    Example usage:
        processor = MilliMortProcesses()
        fatalities_per_km = processor.calculate_fatalities_per_km()
        print(fatalities_per_km)
        age_figure = processor.get_age_calculation(25)
        print(age_figure)

'''
import pandas as pd
import datetime

class MilliMortProcesses:
    
    def __init__(self, excel_path='Statistics/Millimort_Data.xlsx'):
        self.excel_path = excel_path
        self.load_data()
        
    def read_excel_sheet(self, sheet_index):
        """Reads an Excel sheet by its index and returns a DataFrame."""    
        return pd.read_excel(self.excel_path, sheet_name=sheet_index)
    
    def load_data(self):
        """Loads data from Excel sheets into attributes."""
        self.day_figs = self.read_excel_sheet(0)
        self.month_figs = self.read_excel_sheet(1)
        self.time_figs = self.read_excel_sheet(2)
        self.age_figs = self.read_excel_sheet(3)
        self.gender_figs = self.read_excel_sheet(4)
        self.km_travelled_figs = self.read_excel_sheet(5)
        self.fatality_figs = self.read_excel_sheet(6)
        # Repeat for other figures as needed

    def print_figures(self):
        """Prints loaded dataframes."""
        print(self.day_figs)
        print(self.month_figs)
        print(self.time_figs)
        print(self.age_figs)
        print(self.gender_figs)
        # Repeat for other figures as needed

    def calculate_fatalities_per_km(self):
        """Calculates and returns fatalities per km."""
        fatalities_value = self.fatality_figs.loc[0, 'Figure']
        km_figure = self.km_travelled_figs.loc[0, 'Figure']        
        return fatalities_value / km_figure
    
    def get_age_calculation(self, age):
        """Returns calculation based on age in payload."""        
        if (age < 16):
            return self.age_figs.loc[0, 'Figure']
        elif (age >= 16) and (age <= 25):
            return self.age_figs.loc[1, 'Figure']
        elif (age >= 26) and (age <= 35):
            return self.age_figs.loc[2, 'Figure']
        elif (age >= 36) and (age <= 45):
            return self.age_figs.loc[3, 'Figure']
        elif (age >= 46) and (age <= 55):
            return self.age_figs.loc[4, 'Figure']
        elif (age >= 56) and (age <= 65):
            return self.age_figs.loc[5, 'Figure']
        elif (age >= 66) and (age <= 74):
            return self.age_figs.loc[6, 'Figure']
        else:
            return self.age_figs.loc[7, 'Figure']
        #do for all ranges
    
    def get_gender_calculation(self, gender):
        ''' Returns the gender figure given user input
        '''
        if gender == 'Male':
            return self.gender_figs.loc[0, 'Figure']
        elif gender == 'Female':
            return self.gender_figs.loc[1, 'Figure']
        else:
            return self.gender_figs.loc[2, 'Figure']
        
    def get_day_calculation(self, day):
        '''Returns the day figure given the user input'''
        day_to_index = {
        'Monday': 0,
        'Tuesday': 1,
        'Wednesday': 2,
        'Thursday': 3,
        'Friday': 4,
        'Saturday': 5,
        'Sunday': 6,
        }
         # Check if the day is valid to avoid KeyError
        if day in day_to_index:
            return self.day_figs.loc[day_to_index[day], 'Figure']
        else:
            return "Invalid day"

    def get_month_calculation(self, month):
        """Returns the figure associated with the given month."""
        # Dictionary mapping months to their respective row index in self.month_figs
        month_to_index = {
            'January': 0,
            'February': 1,
            'March': 2,
            'April': 3,
            'May': 4,
            'June': 5,
            'July': 6,
            'August': 7,
            'September': 8,
            'October': 9,
            'November': 10,
            'December': 11,
        } 
        # Check if the month is valid to avoid KeyError
        if month in month_to_index:
            return self.month_figs.loc[month_to_index[month], 'Figure']
        else:
            return "Invalid month"
        
    def get_time_frame_calculation(self, time_str):
        """Returns the figure associated with the given time (formatted as 'HH:MM')."""
        # Time frames and their corresponding figures
        # for boundary cases we start on the hour and end at 59mins, 
        #in future could base off what time frame maority of journey takes place in
        time_frames = [
            (('00:00', '03:59'), 13.9613),
            (('04:00', '07:59'), 9.1495),
            (('08:00', '11:59'), 14.4070),
            (('12:00', '15:59'), 21.2680),
            (('16:00', '19:59'), 23.2426),
            (('20:00', '23:59'), 17.9716),
        ]
        
        for (start_str, end_str), figure in time_frames:
            start_time = datetime.datetime.strptime(start_str, '%H:%M').time()
            end_time = datetime.datetime.strptime(end_str, '%H:%M').time()
            
        # Check if input_time falls within the current time frame
        if start_time <= time_str <= end_time:
            return figure
        # Return a default value or message if the time does not match any frame
        return "Invalid time"

# Example usage of class
if __name__ == "__main__":
    processor = MilliMortProcesses()
    processor.load_data()
    processor.print_figures()

    fatalities_per_km = processor.calculate_fatalities_per_km()
    print("{:.25f}".format(fatalities_per_km))

    # Example of getting age calculation
    age_calculation = processor.get_age_calculation(15)
    print(age_calculation)
