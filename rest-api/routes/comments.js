module.exports = {
    getComments(req, res) {
        res.status(200).send(req.store.posts[req.params.postId].comments);
    }, 
    addComment(req, res) {
        let newComment = req.body;
        let commentId = req.store.posts[req.params.postId].comments.length;
        req.store.posts[req.params.postId].comments.push(newComment);
        res.status(201).send({commentId: commentId});      
    },
    updateComment(req, res) {
        req.store.posts[req.params.postId].comments[req.params.commentId] = req.body;
        res.status(200).send(req.store.posts[req.params.postId].comments[req.params.commentId]);
    },
    removeComment(req, res) {
        req.store.posts[req.params.postId].comments.splice(req.params.commentId, 1);
        res.status(204).send();
    }  
};
