import React, { useState } from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet,AlurakutMenuProfileSidebar } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`} >
        <p>@{propriedades.githubUser}</p>
        <hr/>
      </a>

      <AlurakutProfileSidebarMenuDefault/>

    </Box>
  )
}

export default function Home() {
  const usuarioAleatorio = 'gobila';
  const [comunidades, setComunidades] = useState([{
    id: '01',
    title:"AluraKut",
    image: 'http://alurakut.vercel.app/logo.svg',
    link: 'https://discord.com/invite/mzxFNuCtzs',
  }]);
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'luizamarlene',
    'williammago',
    'gobila',
  ]




  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet/>
          </Box>

          <Box>
            {/* fomulario de comunidade */}
            <h2 className="subTitle">o que você deseja fazer?</h2>
            <form onSubmit={ function handleMadeComunity(event){
              event.preventDefault();
              const dadosForm = new FormData(event.target);

              const comunidade ={
                id: new Date().toISOString,
                title: dadosForm.get('title'),
                image: dadosForm.get('image')
              }

              const comunidadeAtualizada = [...comunidades, comunidade]
              setComunidades(comunidadeAtualizada)

            }}>
              <div>
                <input placeholder="Qual o nome da sua comunidade?" name="title" aria-label="Qual o nome da sua comunidade?"/>
              </div>
            
              <div>
                <input placeholder="Coloque uma URL para a imagem da comunidade" 
                      name="image" 
                      aria-label="Coloque uma URL para a imagem da comunidade"/>
              </div>
              <div>
                <input placeholder="Qual o link da comunidade" 
                      name="Link" 
                      aria-label="Qual o link da comunidade"/>
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
         
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          {/* comunidades */}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.slice(0,6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.link}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.slice(0,6).map((itemAtual,) =>{
                console.log(pessoasFavoritas )
                return (
                  <li  key={itemAtual}>
                  <a href={`https://github.com/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
            </ul>
            <a>Todas as pessoas</a>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
