import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainGrid from '../src/components/MainGrid'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

const Erro404 =styled.main`
/* width: 100%; */
display: flex;
grid-gap: 10px;
margin: auto;
max-width: 500px;
padding: 16px;
text-align: center;

@media(min-width: 860px) {
  max-width: 1110px;
  display: block;
  grid-template-areas: 
    "profileArea welcomeArea profileRelationsArea";
  grid-template-columns: 1fr 1fr 1fr;
}
`;

export default function Page404() {
  const usuarioAleatorio = 'gobila';

 
  
  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <Erro404>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
            <img src="http://alurakut.vercel.app/logo.svg" />
            <p>
                Ops! Alguma coisa está faltando...
            </p>
            <p>
                Error 404. Pagina não encontrada
            </p>
        </div>
      </Erro404>
    </>
  )
}
