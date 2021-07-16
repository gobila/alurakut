import React, { useEffect, useState } from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import ProfileFollowing from '../src/components/ProfileFollowing';
import { AsyncMode } from 'react-is';


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
  const [comunidades, setComunidades] = useState([]);

  const followers_URL = "https://api.github.com/users/gobila/"
  // const pessoasFavoritas = [
  //   'juunegreiros',
  //   'omariosouto',
  //   'peas',
  //   'rafaballerini',
  //   'luizamarlene',
  //   'williammago',
  //   'gobila',
  // ]
  const [pessoas, setPessoas] =useState([])


  useEffect(()=>{
    fetch(followers_URL+'following').then((res)=>{
      return res.json()
    }).then((responseJ)=>{
      setPessoas(responseJ)
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '6977b65171b9f1b991c7a40cdce3ce',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    })
  }, [])


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
                // id: new Date().toISOString,
                title: dadosForm.get('title'),
                image_url: dadosForm.get('image'),
                founder: usuarioAleatorio,
                description: 'teste'
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })
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
                    <a href={itemAtual.title}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            
            <a>Todas as Comunidades</a>
          </ProfileRelationsBoxWrapper>
          {/* Pessoas */}
          {/* <ProfileRelationsFollowing title="Seguindo" pessoas={pessoas}/> */}
          <ProfileFollowing title="Seguindo" pessoas={pessoas}/>
        </div>
      </MainGrid>
    </>
  )
}
