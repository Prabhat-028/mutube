import React from 'react'

const Comment = ({ comments, nextPageToken}) => {
  return (
      <div>
          <div className="space-y-4">
          {comments.map((comment) => {
            const snippet = comment.snippet.topLevelComment.snippet;
            return (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={snippet.authorProfileImageUrl}
                  alt={snippet.authorDisplayName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{snippet.authorDisplayName}</p>
                  <p className="text-gray-700">{snippet.textDisplay}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {snippet.likeCount} Likes •{" "}
                    {new Date(snippet.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        </div>

  );
}

export default Comment