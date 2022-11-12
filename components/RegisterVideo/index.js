import { useState } from 'react'
import './style'
import { StyledRegisterVideo } from './style'
import { createClient } from '@supabase/supabase-js'


function useForm(props){

    const [values, setValues] = useState(props.initialValues)

    return{
        values,
        handleChange: (e) =>{
            const value = e.target.value
            const name = e.target.name
            setValues({
                ...values,
                [name]: value
            })
        },
        clearForm: () =>{
            setValues({})
        }
    }
}

const PROJECT_URL = 'https://bvzechfnubgziryxfkit.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2emVjaGZudWJnemlyeXhma2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxODI0NTAsImV4cCI6MTk4Mzc1ODQ1MH0.b0Kh0qwL2V4mBl_gGHvlL7DyRESXGpn5Dcn5_d2vtfU'

const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}



export function RegisterVideo(){

    const [formVisivel, setFormVisivel] = useState(false)

    const formCadastro = useForm({
        initialValues: {titulo: 'Legal', url: 'https://www.youtube.com/watch?v=QsqatJxAUtk'}
    })

    return(
        <StyledRegisterVideo>
            <button className='add-video' onClick={() =>{setFormVisivel(true)}}>
                +
            </button>
            {formVisivel ? (
                <form onSubmit={(e) =>{
                    e.preventDefault()
                    supabase.from('video').insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: 'jogos'
                    })
                    .then((response) =>{
                        console.log(response)
                    })
                    .catch(err =>{
                        console.log(err)
                    })
                    formCadastro.clearForm()
                    setFormVisivel(false)
                }}>
                <div>
                    <button type='button' className='close-modal' onClick={() =>{setFormVisivel(false)}}>
                        X
                    </button>
                    <input placeholder='Título do vídeo' 
                    name='titulo'
                    value={formCadastro.values.titulo}
                    onChange={formCadastro.handleChange}
                    >
                    </input>
                    <input placeholder='URL'
                    name='url'
                     value={formCadastro.values.url}
                     onChange={formCadastro.handleChange}
                    >
                    </input>
                    <button type='submit'>
                        Cadastrar
                    </button>
                </div>
            </form>
            ) : false}
        </StyledRegisterVideo>
    )
} 