import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import DocSendPermission from './DocSendPermission';

test("should have a input", () => {
  render(
      <DocSendPermission/>
  );
  const input = screen.getByRole('textbox', { name: /send_permission/i });  
  expect(input).toBeInTheDocument();
})

test("should have a submit button", () => {
  render(
      <DocSendPermission/>
  );
  // screen.logTestingPlaygroundURL();
  const sendBtn = screen.getByRole('button', { name: /send/i });  
  expect(sendBtn).toBeInTheDocument();
})

test("should render alert if no document is selected on submit", async () => {
  const alertMock = jest.spyOn(window,'alert').mockImplementation();
  const currentDoc = []

  render(
      <DocSendPermission
        currentDoc={currentDoc}
      />
  );

  const sendBtn = screen.getByRole('button', { name: /send/i });
  await userEvent.click(sendBtn);
  expect(alertMock).toHaveBeenCalledTimes(1);
})
