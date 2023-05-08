import prisma from '../../../prisma/index';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const { details } = req.query;
		//Get Auth Users Posts
		try {
			const data = await prisma.post.findFirst({
				where: {
					id: { in: details },
				},
				include: {
					user: true,
					Comment: {
						orderBy: {
							createdAt: 'desc',
						},
						include: {
							user: true,
						},
					},
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ message: 'Error has occured while making a post' });
		}
	}
}
