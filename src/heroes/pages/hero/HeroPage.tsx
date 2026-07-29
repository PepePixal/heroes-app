import { useParams } from "react-router";


export const HeroPage = () => {

  //obtener el parámetro dinámico recibido en la url actual /hero/,
  //retornado por el hook de react-rotuer useParams()
  const { idSlug = '' } = useParams();

  return (
    <div>HeroPage {idSlug}</div>
  )
}
