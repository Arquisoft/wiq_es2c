
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/timer', async (req, res) => {

    const time = parseInt(req.params.time);
    startTimer(time,() =>{
        res.send("Time up");
    })

});

function startTimer(time,func){
    this.timer = setTimeout(()=>{
        func();
    },time)
}

var server = app.listen(port, () => {
    console.log(`Questions Generation Service listening at http://localhost:${port}`);
});

module.exports = server