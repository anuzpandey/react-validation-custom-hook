const useString = () => {

    const titleCase = (str: string) => {
        if ((str === null) || (str === '')) return false

        return str.toLowerCase().split(' ').map(function (word) {
            return word.replace(word[0], word[0].toUpperCase())
        }).join(' ')
    }

    return {
        titleCase,
    }
}

export default useString