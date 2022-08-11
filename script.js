const squares = document.querySelectorAll('[data-square]')

const validLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let activeSquare = 0


document.addEventListener('keypress', (e) => {
    if (!validLetters.includes(e.key.toUpperCase())) return
    squares[activeSquare].textContent = e.key.toUpperCase()
    activeSquare++
})