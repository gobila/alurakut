import React, { useEffect, useState } from 'react';
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
  
  const usuarioGit ='gobila';

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

        <div className="">
          <Box>
            <h2>Minhas comunidades</h2>
            <hr/>
            <div className="tableCommunity commutyArea">
              <div className='boxtable'>
                  {comunidades.map((items)=>{
                    return(
                      <a className='boxtr'>
                        <div key={comunidades.id} className='tdImg'>
                          <img src={items.imageUrl} className="communityList"/>
                        </div>
                        <div className="td">
                          <p>{items.title}</p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
          </Box>
        </div>
      </MainComunidades>
    </>
  )
}

