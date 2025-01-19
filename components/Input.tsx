import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputBoxProps extends TextInputProps {
  title: string;
  auxText?: string;
  children?: React.ReactNode
}

export function InputBox({ title, auxText = "", children, ...rest }: InputBoxProps) {
  return (
    <KeyboardAvoidingView className="flex-col items-start font-medium h-auto w-full">
      <Text className="text-xl">{title}</Text>
      <View className="flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
        <TextInput
          className="h-12 flex-1 text-xl p-2 rounded-md placeholder:text-[#adacac]"
          {...rest}
        />
        {auxText && <Text>{auxText}</Text>}
        <View>
          {children}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
