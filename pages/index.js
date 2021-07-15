import React, { useEffect, useState } from 'react';
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

export default function Home() {
  const usuarioAleatorio = 'gobila';
  const [comunidades, setComunidades] = useState([{
    id: '01',
    title:"AluraKut",
    image: 'http://alurakut.vercel.app/logo.svg',
    link: 'https://discord.com/invite/mzxFNuCtzs',
  },
  {
    id: '02',
    title:"Lênin de Três",
    image: 'https://static-media.hotmart.com/ogdXLfGqA48DnW-tK6jxelneAf8=/280x280/filters:quality(100)/content.hotmedia/image/b10fbeb7-4802-461e-9cfe-ec8bf02a8153.jpg?Expires=1626400591&Signature=R2BCYJl1XTKTDizfUR3Q9EDJsSHhxA8q6swYlMZ1NSgXrSLQeI1TMcAsLDJe0IvJ-q-15DeTTv2Wy8A4lm165nRGvWfasaijuBKQnyhdAic8yAWS5pXG88YOY0uQb7YvUZpPzpC15u3NqKWrgeBOwKiP-hMEliSWBkleKS1IdybteJzw4xKYFA58Xm-5fAYpjOzqNyb60mRLCMWY7v6XtiUcVac~7VZO973a8H5NP8YKFMjQMQbspD~cJHJ-C5SEIfvQVcniLWSTwh4Yy1xn5GZexIe6hQJJTADN7h0rcMVZXnl9UWCfdRpkVPRzN87GYE2RV02-pdlIz0d6kobbog__&Key-Pair-Id=APKAI5B7FH6BVZPMJLUQ',
    link: 'https://discord.com/invite/mzxFNuCtzs',
  },
  {
    id: '03',
    title:"Alura Stars",
    image: 'https://www.alura.com.br/assets/img/stars/logoIlustra.1622650220.svg',
    link: 'https://www.alura.com.br/stars',
  },
  {
    id: '04',
    title:"Banidos do GitHub",
    image: 'https://chainleak.com/wp-content/uploads/2019/07/GitHub-1024x576.png',
    link: 'https://www.alura.com.br/imersao',
  }
]);

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
  }, [])
  console.log(pessoas)
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
