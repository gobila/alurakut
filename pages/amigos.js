import React, { useEffect, useState } from 'react';
import nookies from 'nookies'
import jwt from 'jsonwebtoken';
import MainComunidades from '../src/components/comunidades'
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';



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
  const [comunidades, setComunidades] = useState([])
  
  const usuarioGit =props.githubUser;

  useEffect(()=>{
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
  },[])
  console.log(comunidades)

  return (
    <>
      <AlurakutMenu/>
      <MainComunidades>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioGit} />
        </div>

        <div style={{placeContent:'center', textAlign:'center'}}>
          <Box >
            <img src="https://alurakut.vercel.app/logo.svg" style={{margin:'auto'}}/>
            <h2>Desculpe, ainda estamos construindo uma parte do AluraKut</h2>
          </Box>
        </div>
      </MainComunidades>
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