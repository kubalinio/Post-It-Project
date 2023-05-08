import prisma from '../../../prisma/index';
import { getServerSession } from 'next-auth/next';
import { AuthOptions } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, AuthOptions);
		if (!session) {
			return res.status(401).json({ message: 'Please sign in' });
		}

		//Delete a post
		try {
			const { postId } = req.body;
			const result = await prisma.post.delete({
				where: {
					id: postId,
				},
			});
			res.status(200).json(result);
		} catch (err) {
			res.status(403).json({ message: 'Error has occured while making a post' });
		}
	}
}
