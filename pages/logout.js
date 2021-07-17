import LoginBox from "../src/components/LoginBox";
import LoginScreen from "./login";

export default function logoutPage(){
    return(
        <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="loginScreen">
                <LoginBox/>
            </div>
        </main>
    )
}