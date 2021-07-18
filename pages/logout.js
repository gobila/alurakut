import LoginBox from "../src/components/LoginBox";
import LoginScreen from "./login";

export default function logoutPage(){
    return(
        <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="loginScreen">
                <section className="logoArea">
                <img src="https://alurakut.vercel.app/logo.svg" />

                <h2 style={{color:'#d81d99'}}>Até mais</h2><br/>
                <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
                <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
                </section>

                <section className="formArea">
                        <LoginBox/>
                </section>
            </div>
        </main>
    )
}