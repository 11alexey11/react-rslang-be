const { OK } = require('http-status-codes');
const router = require('express').Router();

const wordService = require('./word.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const extractQueryParam = require('../../utils/getQueryNumberParameter');

router.route('/').get(async (req, res) => {
  const page = extractQueryParam(req.query.page, 0);
  const group = extractQueryParam(req.query.group, 0);

  if (isNaN(page) || isNaN(group)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the group, page numbers should be valid integers'
    );
  }

  if (req.query.all) {
    const words = await wordService.getAllWords();
    console.log(words.map(word => word.toResponse()));
    res.status(OK).send(words.map(word => word.toResponse()));
  } else {
    const words = await wordService.getAll({
      page,
      group
    });
    res.status(OK).send(words.map(word => word.toResponse()));
  }
});

router.route('/:id').get(async (req, res) => {
  const word = await wordService.get(req.params.id);
  res.status(OK).send(word.toResponse());
});

router.route('/').post(async (req, res) => {
  console.log(req.body.words[0]);
  const newWords = await wordService.replaceAllWords(req.body.words);

  res.status(OK).send(newWords.map(word => word.toResponse()));
});

router.route('/:id').post(async (req, res) => {
  const newWord = await wordService.replaceWord(req.params.id, req.body);

  res.status(OK).send(newWord);
});

module.exports = router;
