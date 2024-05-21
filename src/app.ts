import express from 'express'
const app = express()

app.use('/',(req,res) => {
    res.json({message:'h1>Volquetes los Hermanos</h1>'})
})

app.listen(3000, () => {
    console.log('Server corriendo')
})