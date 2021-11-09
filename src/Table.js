import React from 'react'

const Table = () => {

    //variables
    const trs = document.querySelectorAll('tbody tr')
    let tds, txtValue = ''
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
    const handleChange = ({ target }) => {
        const { id, value } = target
        setInput({ ...input, [id]: value })

    }

    //filter
    const handleFilter = ({ target }) => {
        for (let index = 0; index <= trs.length - 1; index++) {
            tds = trs[index].childNodes[target.dataset.id]
            if (tds) {
                txtValue = tds.textContent || tds.innerText;
                if (txtValue.indexOf(target.value) > -1) {
                    trs[index].style.display = ""
                } else {
                    trs[index].style.display = "none"
                }
            }
        }
    }

    //load fetch
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
                        <th>Email<br /><input data-id="0" type="text" id="email" value={input.email} onChange={handleChange} onKeyUp={handleFilter} /></th>
                        <th>First Name<input data-id="1" type="text" id="nome" value={input.nome} onChange={handleChange} onKeyUp={handleFilter} /></th>
                        <th>Last Name<input data-id="2" type="text" id="sobrenome" value={input.sobrenome} onChange={handleChange} onKeyUp={handleFilter} /></th>
                        <th>Primary Group<input data-id="3" type="text" id="grupo" value={input.grupo} onChange={handleChange} onKeyUp={handleFilter} /></th>
                        <th>Phone Number<input data-id="4" type="text" id="telefone" value={input.telefone} onChange={handleChange} onKeyUp={handleFilter} /></th>
                        <th>Hours Studied<input data-id="5" type="text" id="horasEstudadas" value={input.horasEstudadas} onChange={handleChange} onKeyUp={handleFilter} /></th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item, index) => {
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
