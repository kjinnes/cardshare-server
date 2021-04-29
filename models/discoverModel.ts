/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { UpdateWriteOpResult } from 'mongoose';
import { Users, User } from '../db';

async function getPopular() : Promise<Array<User>> {
  const all:Array<User> = await Users.find({ myDecks: { $elemMatch: { votes: { $gt: 10 } } } },
    { username: 1, myDecks: { $elemMatch: { votes: { $gt: 10 } } } });
  return all;
}

async function getByGenre(genre:string) {
  const some = await Users.find({ myDecks: { $elemMatch: { genre } } },
    { username: 1, myDecks: { $elemMatch: { genre } } });
  return some;
}

async function getByOLID(OLID:string) {
  const some = await Users.find({ myDecks: { $elemMatch: { OLID } } },
    { username: 1, myDecks: { $elemMatch: { OLID } } });
  return some;
}

async function getById(id:string) {
  const some = await Users.find({ myDecks: { $elemMatch: { _id: id } } },
    { username: 1, myDecks: { $elemMatch: { _id: id } } });
  return some;
}

async function postVote(id:string, direction:string) {
  let res: UpdateWriteOpResult | null = null;
  if (direction === 'up') res = await Users.updateOne({ 'myDecks._id': id }, { $inc: { 'myDecks.$.votes': 1 } });
  else if (direction === 'down') res = await Users.updateOne({ 'myDecks._id': id }, { $inc: { 'myDecks.$.votes': -1 } });
  return res?.nModified || 0;
}

export {
  getPopular, getByGenre, getByOLID, getById, postVote 
};
