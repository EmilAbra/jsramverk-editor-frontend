import { render, screen } from "@testing-library/react";
import Comment from './Comment';

const comment = {
    date: '09:00 08/25/2023',
    content: 'test comment',
    user: 'test@test.com',
};

test("should render a comment", () => {
    render(
        <Comment 
            date={comment.date}
            content={comment.content}
            user={comment.user}
        />
    );
    
    const commentUser = screen.getByText(/test@test.com/i);
    const commentDate = screen.getByText(/09:00 08\/25\/2023/i);
    const commentContent = screen.getByText(/test comment/i);
    expect(commentUser).toBeInTheDocument();
    expect(commentDate).toBeInTheDocument();
    expect(commentContent).toBeInTheDocument();
})