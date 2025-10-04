import PostModel from '../models/Post.js'
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось создать пост',
    });
  }
};


export const getAll = async (req, res) => {
  try {
    const posts = await  PostModel.find().populate('user').sort({ createdAt: -1 });
    res.json(posts)
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" } 
    );

    if (!doc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndDelete({ _id: postId });
    if (doc.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Нет прав на удаление этого поста' });
    }
    if (!doc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось удалить статью',
    });
    
  }
};
export const update  = async (req,res) => {
  try {
    const postId = req.params.id;
  await PostModel.updateOne({
    _id:postId,
  }, {
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
  })
res.json({
  success:true
})
}
  catch (err) {
console.log(err);
res.status(500).json ({
  message:"Не удалось обновить статью"
})

  }
}
export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    const comment = {
      user: req.userId,
      text,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    await post.populate('comments.user', 'username avatarUrl');

    res.json(post.comments[post.comments.length - 1]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось добавить комментарий' });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      likesCount: post.likes.length,
      isLiked: !isLiked,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при обработке лайка' });
  }
};
