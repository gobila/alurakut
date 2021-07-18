import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
//components
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import ProfileFollowing from '../src/components/ProfileFollowing';



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

export default function Home(props) {
  const usuarioGit =props.githubUser;
  const [comunidades, setComunidades] = useState([]);
  console.log('usuario'+usuarioGit)
  

  const base_URL = "https://api.github.com/users/"+usuarioGit+'/'

  const [pessoas, setPessoas] =useState([])

  const [followers, setFollowers] = useState()


  useEffect(()=>{
    // pegando quem sigo
    fetch(base_URL+'following').then((res)=>{
      return res.json()
    }).then((response)=>{
      setPessoas(response)
    })
    // pegando seguidores
    fetch(base_URL+'followers').then((res)=>{
      return res.json()
    }).then((response)=>{
      setFollowers(response.length)
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
      setComunidades(comunidadesVindasDoDato)
    })
  }, [])


  return (
    <>
      <AlurakutMenu githubUser={usuarioGit} />
      <MainGrid>
        
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioGit} />
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
                founder: usuarioGit,
                description: dadosForm.get('description')
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
                <input placeholder="Qual a descrição da comunidade" 
                      name="description" 
                      aria-label="Qual a descrição da comunidade"/>
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
          <ProfileFollowing title="Seguindo" pessoas={pessoas} titleSeg="Seguidores" followers={followers}/>
        </div>
      
      
      </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
} 