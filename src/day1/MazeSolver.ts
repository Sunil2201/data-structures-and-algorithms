const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // 1. Base case
    // off the map
    if (
        curr.x < 0 ||
        curr.x > maze[0].length ||
        curr.y < 0 ||
        curr.y > maze.length
    ) {
        return false;
    }

    // on a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // at the end
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        return true;
    }

    // seen it
    if (seen[curr.y][curr.x]) {
        return false;
    }

    // 3 recurse
    // pre
    seen[curr.y][curr.x] = true;
    path.push(curr);

    // recurse
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (
            walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)
        ) {
            return true;
        }
    }

    // post
    // this will ensure that when you reach a dead end, you pop the last element so that you start looking from the previous element itself,
    // as you can see in the case below in the 3rd row, it goes the farthest to the right, as it is a dead end - it cannot go further, so it
    // comes back to the previous element and start looking for any possibilities from there
    // [
    //     "#######",
    //     "#S####E#",
    //     "#   ###",
    //     "# #####",
    //     "#######",
    // ]
    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);
    return path;
}

const maze = [
    "xxxxxxxxxxE", // 0
    "x        xxx", // 1
    "x xxxxxx xxx", // 2
    "x x      xxx", // 3
    "x xxxxxxxxxx", // 4
    "x          x", // 5
    "xxxxxxxxxx x", // 6
    "S          x", // 7
    "xxxxxxxxxxxx", // 8
];
