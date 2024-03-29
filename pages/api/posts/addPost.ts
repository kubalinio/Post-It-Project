import prisma from '../../../prisma/index';
import { getServerSession } from 'next-auth/next';
import { AuthOptions } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, AuthOptions);
		if (!session) {
			return res.status(401).json({ message: 'Please signin to create a post.' });
		}

		const title: string = req.body.title;

		//Get User
		const prismaUser = await prisma.user.findUnique({
			where: { email: session?.user?.email! },
		});
		//Check title
		if (title.length > 300) {
			return res.status(403).json({ message: 'Please write a shorter post' });
		}

		if (!title.length) {
			return res.status(403).json({ message: 'Please write something before we can post it.' });
		}

		//Create Post
		try {
			const result = await prisma.post.create({
				data: {
					title,
					userId: prismaUser!.id,
				},
			});
			res.status(200).json(result);
		} catch (err) {
			res.status(403).json({ message: 'Error has occured while making a post' });
		}
	}
}
