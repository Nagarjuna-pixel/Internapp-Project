import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

const Applyovertime = () => {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      name: '',
      employeeId: '',
      designation: '',
      department: '',
      extraWorkDate: new Date(),
      inPunchTime: new Date(),
      outPunchTime: new Date(),
      workingHours: '',
      reason: '',
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showInTimePicker, setShowInTimePicker] = useState(false);
  const [showOutTimePicker, setShowOutTimePicker] = useState(false);

  // Watch inPunchTime and outPunchTime to calculate working hours
  const inPunchTime = watch('inPunchTime');
  const outPunchTime = watch('outPunchTime');

  // Calculate working hours whenever inPunchTime or outPunchTime changes
  useEffect(() => {
    if (inPunchTime instanceof Date && outPunchTime instanceof Date) {
      const diffMs = outPunchTime - inPunchTime;
      const diffHours = diffMs / (1000 * 60 * 60); // Convert milliseconds to hours
      if (diffHours >= 0) {
        setValue('workingHours', diffHours.toFixed(2), { shouldValidate: true });
      } else {
        setValue('workingHours', '', { shouldValidate: true });
      }
    }
  }, [inPunchTime, outPunchTime, setValue]);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Add logic to handle form submission (e.g., API call)
  };

  const renderDatePicker = (name, value, setShowPicker, showPicker) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>Over Time Date</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          value={value instanceof Date ? value.toLocaleDateString() : ''}
          editable={false}
          placeholder="Select Over Time Date (Current Month)"
        />
        {showPicker && (
          <DateTimePicker
            value={value instanceof Date ? value : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              if (Platform.OS === 'android' && event.type === 'set') {
                setShowPicker(false);
                if (selectedDate && selectedDate instanceof Date) {
                  setValue(name, selectedDate, { shouldValidate: true });
                }
              } else {
                setShowPicker(Platform.OS === 'ios');
                if (selectedDate && selectedDate instanceof Date) {
                  setValue(name, selectedDate, { shouldValidate: true });
                }
              }
            }}
          />
        )}
      </TouchableOpacity>
      {errors[name] && <Text style={styles.error}>{errors[name].message}</Text>}
    </View>
  );

  const renderTimePicker = (name, value, setShowPicker, showPicker, label) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          value={value instanceof Date ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
          editable={false}
          placeholder={`Select ${label} (1-12 with AM/PM)`}
        />
        {showPicker && (
          <DateTimePicker
            value={value instanceof Date ? value : new Date()}
            mode="time"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            is24Hour={false} // Enforce 12-hour format with AM/PM
            onChange={(event, selectedTime) => {
              if (Platform.OS === 'android' && event.type === 'set') {
                setShowPicker(false);
                if (selectedTime && selectedTime instanceof Date) {
                  setValue(name, selectedTime, { shouldValidate: true });
                }
              } else {
                setShowPicker(Platform.OS === 'ios');
                if (selectedTime && selectedTime instanceof Date) {
                  setValue(name, selectedTime, { shouldValidate: true });
                }
              }
            }}
          />
        )}
      </TouchableOpacity>
      {errors[name] && <Text style={styles.error}>{errors[name].message}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Over Time Form</Text>
        <View style={styles.formBox}>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Name is required' }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Name"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
              </View>
            )}
          /><View style={{ height: 10 }} />

          <Controller
            control={control}
            name="employeeId"
            rules={{ required: 'Employee ID is required' }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Employee ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Employee ID"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.employeeId && <Text style={styles.error}>{errors.employeeId.message}</Text>}
              </View>
            )}
          /><View style={{ height: 10 }} />

          <Controller
            control={control}
            name="designation"
            rules={{ required: 'Designation is required' }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Designation</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Designation"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.designation && <Text style={styles.error}>{errors.designation.message}</Text>}
              </View>
            )}
          /><View style={{ height: 10 }} />

          <Controller
            control={control}
            name="department"
            rules={{ required: 'Department is required' }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Department</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Department"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.department && <Text style={styles.error}>{errors.department.message}</Text>}
              </View>
            )}
          /><View style={{ height: 10 }} />

          <Controller
            control={control}
            name="extraWorkDate"
            rules={{ required: 'Extra Work Date is required' }}
            render={({ field: { value } }) =>
              renderDatePicker('extraWorkDate', value, setShowDatePicker, showDatePicker)
            }
          /><View style={{ height: 10 }} />

          <Controller
            control={control}
            name="inPunchTime"
            rules={{ required: 'In Punch Time is required' }}
            render={({ field: { value } }) =>
              renderTimePicker('inPunchTime', value, setShowInTimePicker, showInTimePicker, 'In Punch Time')
            }
          /><View style={{ height: 10 }} />

          <Controller
            control={control}
            name="outPunchTime"
            rules={{ required: 'Out Punch Time is required' }}
            render={({ field: { value } }) =>
              renderTimePicker('outPunchTime', value, setShowOutTimePicker, showOutTimePicker, 'Out Punch Time')
            }
          /><View style={{ height: 10 }} />

          <Controller
            control={control}
            name="workingHours"
            rules={{ required: 'Working Hours is required' }}
            render={({ field: { value } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Working Hours</Text>
                <TextInput
                  style={styles.input}
                  value={value}
                  editable={false}
                  placeholder="Working Hours (auto-calculated)"
                />
                {errors.workingHours && <Text style={styles.error}>{errors.workingHours.message}</Text>}
              </View>
            )}
          /><View style={{ height: 10 }} />

          <Controller
            control={control}
            name="reason"
            rules={{ required: 'Reason is required' }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Reason</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  placeholder="Enter Reason"
                  value={value}
                  onChangeText={onChange}
                  multiline={true}
                  numberOfLines={4}
                />
                {errors.reason && <Text style={styles.error}>{errors.reason.message}</Text>}
              </View>
            )}
          /><View style={{ height: 10 }} />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 2, // 2px gap between fields
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Applyovertime;