function LogMsg(value) {
    console.log(`[${new Date().toLocaleTimeString()}] ${value}`);
}

function InfoMsg(value) {
    console.info(`[${new Date().toLocaleTimeString()}] ${value}`);
}

function WarnMsg(value) {
    console.warn(`[${new Date().toLocaleTimeString()}] ${value}`);
}

function ErrorMsg(value) {
    console.error(`[${new Date().toLocaleTimeString()}] ${value}`);
}