import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const leaveTypes = [
  { label: 'Casual', value: 'casual' },
  { label: 'Compensatory', value: 'compensatory' },
  { label: 'Earn', value: 'earn' },
  { label: 'Loss of Pay', value: 'loss_of_pay' },
  { label: 'Medical', value: 'medical' },
  { label: 'On Duty', value: 'on_duty' },
  { label: 'Extra Working', value: 'extra_working' },
];

const sessionOptions = [
  { label: 'Forenoon', value: 'forenoon' },
  { label: 'Afternoon', value: 'afternoon' },
];

const ApplyLeave = () => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: '',
      employeeId: '',
      department: '',
      leaveType: '',
      fromDate: new Date(),
      toDate: new Date(),
      fromSession: '',
      toSession: '',
      reason: '',
    },
  });

  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Add logic to handle form submission (e.g., API call)
  };

  const renderDatePicker = (name, value, setShowPicker, showPicker) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{name === 'fromDate' ? 'From Date' : 'To Date'}</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          value={value instanceof Date ? value.toLocaleDateString() : ''}
          editable={false}
          placeholder={`Select ${name === 'fromDate' ? 'From' : 'To'} Date`}
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Apply for Leave</Text>
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
          /><View style={{ height: 15 }} />

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
          /><View style={{ height: 15 }} />

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
          /><View style={{ height: 15 }} />

          <Controller
            control={control}
            name="leaveType"
            rules={{ required: 'Leave Type is required' }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Leave Type</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={leaveTypes}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Leave Type"
                  value={value}
                  onChange={(item) => onChange(item.value)}
                />
                {errors.leaveType && <Text style={styles.error}>{errors.leaveType.message}</Text>}
              </View>
            )}
          /><View style={{ height: 15 }} />

          <Controller
            control={control}
            name="fromDate"
            rules={{ required: 'From Date is required' }}
            render={({ field: { value } }) =>
              renderDatePicker('fromDate', value, setShowFromDatePicker, showFromDatePicker)
            }
          /><View style={{ height: 15 }} />

          <Controller
            control={control}
            name="fromSession"
            rules={{ required: 'From Session is required' }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>From Session</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={sessionOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="Select From Session"
                  value={value}
                  onChange={(item) => onChange(item.value)}
                />
                {errors.fromSession && <Text style={styles.error}>{errors.fromSession.message}</Text>}
              </View>
            )}
          /><View style={{ height: 15 }} />

          <Controller
            control={control}
            name="toDate"
            rules={{ required: 'To Date is required' }}
            render={({ field: { value } }) =>
              renderDatePicker('toDate', value, setShowToDatePicker, showToDatePicker)
            }
          /><View style={{ height: 15 }} />

          <Controller
            control={control}
            name="toSession"
            rules={{ required: 'To Session is required' }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>To Session</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={sessionOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="Select To Session"
                  value={value}
                  onChange={(item) => onChange(item.value)}
                />
                {errors.toSession && <Text style={styles.error}>{errors.toSession.message}</Text>}
              </View>
            )}
          /><View style={{ height: 15 }} />

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
          /><View style={{ height: 15 }} />

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
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
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

export default ApplyLeave;