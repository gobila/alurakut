import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

function ProfileFollowing(props){

  return(
    <ProfileRelationsBoxWrapper>
      <div style={{display:'flex', justifyContent:'space-between'}}>
      <h2 className="smallTitle">
        {props.title} ({props.pessoas.length})
      </h2>
      <h2 className="smallTitle">
        {props.titleSeg} ({props.followers})</h2>
      </div>
      <ul>
        {props.pessoas.slice(0,6).map((itemAtual) =>{
          // console.log(pessoasFavoritas )
          return (
            <li  key={itemAtual.id}>
            <a href={`https://github.com/${itemAtual.login}`}>
              <img src={itemAtual.avatar_url} />
              <span>{itemAtual.login}</span>
            </a>
          </li>
        )
      })}
      </ul>
      <a>Todas as pessoas</a>
  </ProfileRelationsBoxWrapper>
  )
}

export default ProfileFollowing