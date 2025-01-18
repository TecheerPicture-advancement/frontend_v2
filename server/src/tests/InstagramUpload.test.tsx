import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import InstagramUpload from '../pages/Instagram_Upload';

// axios 모킹
vi.mock('axios');
const mockedAxios = axios as vi.Mocked<typeof axios>;

describe('InstagramUpload Component', () => {
  it('updates message2 with GPT API response when arrow button is clicked', async () => {
    // Mock 성공 응답
    mockedAxios.post.mockResolvedValueOnce({
      data: { message: 'Generated GPT Response' },
    });

    render(<InstagramUpload />);

    // 첫 번째 텍스트 영역에 값 입력
    const message1Textarea = screen.getByPlaceholderText(
      '인스타그램 피드에 적을 캡션을 적어주세요'
    );
    fireEvent.change(message1Textarea, { target: { value: 'Test Input' } });

    // 화살표 버튼 클릭
    const arrowButton = screen.getByRole('img', { name: /arrow_right/i });
    fireEvent.click(arrowButton);

    // 두 번째 텍스트 영역에 API 응답 값이 표시되는지 확인
    const message2Textarea = await waitFor(() =>
      screen.getByPlaceholderText('GPT에서 생성된 메시지가 여기에 표시됩니다.')
    );
    expect(message2Textarea).toHaveValue('Generated GPT Response');

    // axios가 호출된 내용 확인
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/gpt', {
      prompt: 'Test Input',
    });
  });

  it('displays error message if GPT API call fails', async () => {
    // Mock 실패 응답
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: 'GPT API 호출 실패' } },
    });

    render(<InstagramUpload />);

    // 화살표 버튼 클릭
    const arrowButton = screen.getByRole('img', { name: /arrow_right/i });
    fireEvent.click(arrowButton);

    // 에러 메시지가 표시되는지 확인
    const errorMessage = await waitFor(() =>
      screen.getByText(/GPT API 호출 실패/i)
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
