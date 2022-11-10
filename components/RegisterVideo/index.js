import { useState } from 'react'
import './style'
import { StyledRegisterVideo } from './style'


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



export function RegisterVideo(){

    const [formVisivel, setFormVisivel] = useState(true)

    const formCadastro = useForm({
        initialValues: {titulo: 'Frost', url: 'http//youtube.com...'}
    })

    return(
        <StyledRegisterVideo>
            <button className='add-video' onClick={() =>{setFormVisivel(true)}}>
                +
            </button>
            {formVisivel ? (
                <form onSubmit={(e) =>{
                    e.preventDefault()
                    setFormVisivel(false)
                    formCadastro.clearForm()
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