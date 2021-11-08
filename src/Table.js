import React from 'react'

const Table = () => {

    //variables
    const [dados, setDados] = React.useState(null)
    const [loading, setLoading] = React.useState(null)
    const [input, setInput] = React.useState({
        email: '',
        nome: '',
        sobrenome: '',
        grupo: '',
        telefone: '',
        horasEstudadas: ''
    })

    //fetch data
    const pegarDados = React.useCallback(async () => {
        setLoading(false)
        const url = await fetch('http://localhost:3000/infos')
        const json = await url.json()
        setDados(json)
        setLoading(true)
    }, [dados])


    //input
    const handleChange = ({target}) =>{
        const {id, value} = target
        setInput({...input, [id]: value})
        console.log(target)
    }

    //load
    React.useEffect(() => {
        pegarDados()
    }, [])

    if (loading === false) return <p>Loading Data</p>
    if (dados === null) return null
    return (
        <div className="table-container">
           <table>
               <thead>
                <tr>
                    <th>Email<br/><input type="text" id="email" value={input.email} onChange={handleChange}/></th>
                    <th>First Name<input type="text" id="nome" value={input.nome} onChange={handleChange}/></th>
                    <th>Last Name<input type="text" id="sobrenome" value={input.sobrenome} onChange={handleChange}/></th>
                    <th>Primary Group<input type="text" id="grupo" value={input.grupo} onChange={handleChange}/></th>
                    <th>Phone Number<input type="text" id="telefone" value={input.telefone} onChange={handleChange}/></th>
                    <th>Hours Studied<input type="text" id="horasEstudadas" value={input.horasEstudadas} onChange={handleChange}/></th>
                </tr>
               </thead>
               <tbody>
                    
                        {dados.map((item, index)=>{
                            return (
                            <tr key={index}>
                            <td>{item.email}</td>
                            <td>{item.nome}</td>
                            <td>{item.sobrenome}</td>
                            <td>{item.grupo}</td>
                            <td>{item.telefone}</td>
                            <td>{item.estudadas}</td>
                            </tr>
                            )
                        })}
               </tbody>
           </table>

        </div>
    )
}

export default Table
