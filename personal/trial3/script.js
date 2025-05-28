function fragmanlar(fragmanId) {
    const fragman = document.querySelectorAll('.fragman');
    fragman.forEach(fragman => fragman.classList.add('gizleGoster'));
    document.getElementById(fragmanId).classList.remove('gizleGoster');
}

function videoGizle() {
    const video = document.querySelectorAll('.fragman');
    video.forEach(video => video.classList.add('gizleGoster'));
    document.getElementById(fragmanId).classList.remove('gizleGoster');
}
