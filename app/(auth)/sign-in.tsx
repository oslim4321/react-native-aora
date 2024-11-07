import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, Redirect, router } from "expo-router";
import { signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
const SignIn = () => {
  // redirect the user of they are logged in
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  //  -------

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!form.email && !form.password) {
      Alert.alert("Please enter all field");
    }

    setisSubmitting(true);

    try {
      const res = await signIn(form.email, form.password);

      // set it to global state

      router.replace("/home");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      Alert.alert("Error", errorMessage);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <View className="w-full justify-center  px-4 my-6">
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-[115px] h-[35px] "
        />
        <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">
          Login to Aora
        </Text>
      </View>

      <FormField
        title={"Email"}
        value={form.email}
        handleChangeText={(e) =>
          setForm({
            ...form,
            email: e,
          })
        }
        keyboardType="email-address"
        otherStyle="mt-7"
      />

      <FormField
        title={"password"}
        value={form.password}
        handleChangeText={(e) =>
          setForm({
            ...form,
            password: e,
          })
        }
        otherStyle="mt-7"
      />

      <CustomButton
        title="Sign In"
        handlePress={onSubmit}
        containerStyle="mt-7"
        isLoading={isSubmitting}
      />

      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-gray-100 font-pregular">
          Don't have an Account
        </Text>

        <Link
          className="text-lg font-psemibold text-secondary"
          href={"/sign-up"}
        >
          Sign up
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
