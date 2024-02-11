interface Vector2 {
	x: number;
	y: number;
}

export function calculateCenter(vectorA: Vector2, vectorB: Vector2): Vector2 {
	const xDiff = vectorB.x - vectorA.x;
	const yDiff = vectorB.y - vectorA.y;
	const vectorCenter: Vector2 = {
		x: vectorA.x + xDiff / 2,
		y: vectorB.y + yDiff / 2
	};
	return vectorCenter;
}
