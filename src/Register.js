import { useState } from "react";
import { Alert, View } from "react-native";
import {TextInput,Button, Text, HelperText} from "react-native-paper";
import  auth  from "@react-native-firebase/auth";

const Register =(navigation)=>{
    const[email,setEmail] = useState("");
    const[password,setPassword] =useState("");
    const[passwordComfirm,setPasswordComfirm] =useState("");
    const[showpassword,setShowPassword] =useState(false);
    const[showpasswordComfirm,setShowPasswordComfirm] =useState(false);
    const handlerCreateAccount=()=>{
        auth().createUserWithEmailAndPassword(email,password)
        .then(()=>navigation.navigate("Login"))
        .catch(e=>Alert.alert(e.message))
    }
    const hasErrorPassword =()=> password.length<6
    const hasErrorPasswordConfirm =()=> passwordComfirm != password
    const hasErrorEmail =()=> !email.includes("@")

    return(
        <View style={{flex:1,justifyContent:"center"}}>
            <Text style={{fontSize:35,padding:10}}>
                Register
            </Text>
            <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            <HelperText type="error" visible={hasErrorEmail()}>
                Sai dia chi email
            </HelperText>
            <TextInput
                label={"Password"}
                value={password}
                secureTextEntry={!showpassword}
                onChangeText={setPassword}
                right={
                    <TextInput.Icon 
                    icon ={showpassword? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showpassword)}
                    />}
            />
            <HelperText type="error" visible={hasErrorPassword()}>
                Password it nhat 6 ki tu
            </HelperText>
            <TextInput
                label={"PasswordComfirm"}
                value={passwordComfirm}
                secureTextEntry={!showpasswordComfirm}
                onChangeText={setPasswordComfirm}
                right={
                    <TextInput.Icon 
                    icon ={showpasswordComfirm? "eye-off" : "eye"}
                    onPress={() => setShowPasswordComfirm(!showpasswordComfirm)}
                    />}
            />
            <HelperText type="error" visible={hasErrorPasswordConfirm()}>
                Password Confirm khong khop
            </HelperText>
            <Button mode ="contained"
                onPress={handlerCreateAccount}
                disabled={hasErrorEmail()||hasErrorPassword()||hasErrorPasswordConfirm()}
            >
                Register
            </Button>
        </View>
    )
}
export default Register;