export default function two_crystal_balls(breaks: boolean[]): number {
    const jumpAmount = Math.floor(Math.sqrt(breaks.length));

    let i = jumpAmount;

    while (i < breaks.length) {
        if (breaks[i]) {
            break;
        }

        i += jumpAmount;
    }

    i -= jumpAmount;
    
    for (let idx = i; idx <= jumpAmount + i; ++idx) {
        if (breaks[idx]) {
            return idx;
        }
    }

    return -1;
}
