import React, { useState } from 'react';
import {useRouter} from 'next/router';
import nookies from 'nookies';

export default function LoginBox(){
    const router = useRouter()
    const [githubUser, setGithubUser]=useState([])
    return(
        <section className="formArea">
          <form className="box" onSubmit={(event)=>{
              event.preventDefault();
            //   conectando com a api da alura
              fetch('https://alurakut.vercel.app/api/login',{
                  method:'POST',
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({ githubUser: githubUser })//pegando os usuario e enviando a api
              }).then( async (res)=>{//pegando os dados do token e setando os tokens
                  const dados = await res.json();
                  const token = dados.token;
                  nookies.set(null, 'USER_TOKEN', token,{
                      path:'/',
                      maxAge: 86400*2
                  })
              })
              router.push('/')//roteamento do next
          }}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
          </p>
            <input
                placeholder="Usuário GitHub" 
                value={githubUser}
                onChange={(event)=>{
                    setGithubUser(event.target.value)
                }}
                
            />
            {githubUser.length ===0 ? "Insira o usuário " : ""}
            
            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>
    )
}