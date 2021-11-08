import React from 'react'

const Table = () => {

    //variables
    const [dados, setDados] = React.useState(null)
    const [loading, setLoading] = React.useState(null)

    //fetch data
    const pegarDados = React.useCallback(async () => {
        setLoading(false)
        const url = await fetch('http://localhost:3000/infos')
        const json = await url.json()
        setDados(json)
        console.log(dados)
        setLoading(true)
    }, [dados])


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
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Primary Group</th>
                    <th>Phone Number</th>
                    <th>Hours Studied</th>
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
