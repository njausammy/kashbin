import React, { useState } from 'react';
import { TextInput, TextStyle, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { Input, InputField, Pressable, Theme } from '@gluestack-ui/themed';
import CalenderIcon from 'react-native-vector-icons/Feather';

interface DateInputProps {
    value: Date;
    onChange: (date: Date) => void;
}

const DateInput = (props: DateInputProps) => {
    const [open, setOpen] = useState(false);

    const hideDatepicker = () => {
        setOpen(false);
    };

    const handleConfirm = (date: Date) => {
        hideDatepicker();
    };

    return (
        <>
            <Pressable onPress={() => setOpen(true)}>
                <Input
                    borderColor="#B8B8B8"
                    borderWidth={1}
                    borderRadius={8}
                    height={48}
                    width="$full"
                    flexDirection="row"
                    alignItems="center"
                    paddingLeft={12}
                >
                    <CalenderIcon name="calendar" size={24} color="#B8B8B8" />
                    <InputField
                        placeholder="DD/MM/YYYY"
                        value={props.value ? format(props.value, 'dd/MM/yyyy') : ''}
                        editable={false}
                        style={{ flex: 1 }}
                    />
                </Input>
            </Pressable>
            <DateTimePickerModal
                isVisible={open}
                mode="date"
                themeVariant="light"
                onConfirm={handleConfirm}
                onCancel={hideDatepicker}
                display="inline"
            />
        </>
    );
};

export default DateInput;
