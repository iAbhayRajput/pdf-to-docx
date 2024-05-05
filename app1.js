const {PythonShell} = require('python-shell');
const path = require('path');

const pyshell = new PythonShell('./pdf-2-docx.py',{
    mode: 'text',
    pythonPath:'python',
    scriptPath:__dirname,
    args:['./OPERATING SYSTEMS LAB(R18).pdf','./']
})

pyshell.on('message',(msg) => {
    console.log(msg)
})

pyshell.on('error', (msg) =>{
    console.log(msg)
})

pyshell.end(err =>{
    console.log(err)
})