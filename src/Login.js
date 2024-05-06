import { useState } from "react";
import { Alert, View, ImageBackground, StyleSheet } from "react-native";
import {TextInput,Button, Text} from "react-native-paper";
import  auth  from "@react-native-firebase/auth";
import {GoogleSignin,GoogleSigninButton} from "@react-native-google-signin/google-signin"
import CustomInput from "../custom/CustomInput";

const Login =({navigation})=>{
    const[email,setEmail] = useState("");
    const[password,setPassword] =useState("");
    const[showpassword,setShowPassword] =useState(false);

    const handlerLogin=()=>{
        auth().signInWithEmailAndPassword(email,password)
        .then(()=> navigation.navigate("ToDoApps"))
        .catch(e=>Alert.alert(e.message))
    }
    GoogleSignin.configure({
        webClientId: '258839001408-07u1ie1o9aosp83in7jpqhc7mi9icuaq.apps.googleusercontent.com',
    });
    const handlerLoginWithGoogle = async ()=>{
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog:true})
        const {idToken} = GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }

    return(
        <View style={myStyle.container}>
            <View style={myStyle.containerlogo}>
                <ImageBackground
                style = {myStyle.logo}
                resizeMode="cover"
                source={{
                    uri:'https://4.bp.blogspot.com/-gUHSOkuiJBc/VzD9V0XJdTI/AAAAAAABABg/YSPUoXJMFRIYxU4jVbj_j4L1pT_96eCmACKgB/s320/GumballS2.png'
                }}
                />
            </View>

            <View style={myStyle.containerlogin}>
                <Text style={{fontSize:35,padding:10}}>
                    Login
                </Text>
                {/* <TextInput
                    label={"Email"}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder={"Password"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showpassword}
                /> */}
                <CustomInput placeholder="Username" value={email} setValue={setEmail}/>
                <CustomInput 
                    placeholder="Password" 
                    value={password} 
                    setValue={setPassword}
                    secureTextEntry={!showpassword}
                    right={
                        <TextInput.Icon 
                        icon ={showpassword? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showpassword)}
                        />}
                />
                <Button mode ="contained"
                    onPress={handlerLogin}
                >
                    Login
                </Button>
                <Button mode ="outlined"
                    onPress={()=>navigation.navigate("Register")}
                >
                    Don't have an account? Create one
                </Button>
                <GoogleSigninButton height={20} width="auto" onPress={handlerLoginWithGoogle}/>
            </View>
            <View style={myStyle.containerlogingg}>
                
            </View>
        </View>
    )
}
export default Login;

const myStyle = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center"
    },
    containerlogo:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'aqua'
    },
    containerlogin:{
        flex:1,
        
    },
    containerlogingg:{
        
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
        height:'auto',
        width:400,
        flex:1
    }
})