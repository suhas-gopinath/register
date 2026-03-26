import { submit } from './submit';

// Mock fetch globally
global.fetch = jest.fn();

// Mock window.location.href
delete (window as any).location;
window.location = { href: '' } as any;

// Mock setTimeout
jest.useFakeTimers();

describe('submit function', () => {
  let mockSetMessage: jest.Mock;
  let mockAlert: jest.SpyInstance;

  beforeEach(() => {
    // Reset all mocks before each test
    mockSetMessage = jest.fn();
    mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    (global.fetch as jest.Mock).mockClear();
    window.location.href = '';
    jest.clearAllTimers();
  });

  afterEach(() => {
    mockAlert.mockRestore();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('Successful Registration', () => {
    it('should display success message on successful registration', async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      await submit('testuser', 'testpassword', mockSetMessage);

      // Wait for promise to resolve
      await Promise.resolve();

      // Assert
      expect(mockSetMessage).toHaveBeenCalledWith(
        'Registration successful. You will be redirected to login page.'
      );
      expect(mockSetMessage).toHaveBeenCalledTimes(1);
    });

    it('should call fetch with correct parameters', async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      await submit('testuser', 'testpassword', mockSetMessage);

      // Assert
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:90/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
      });
    });

    it('should redirect to login page after 7 seconds on successful registration', async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      await submit('testuser', 'testpassword', mockSetMessage);
      await Promise.resolve();

      // Assert - before timer runs
      expect(window.location.href).toBe('');

      // Fast-forward time by 7 seconds
      jest.advanceTimersByTime(7000);

      // Assert - after timer runs
      expect(window.location.href).toBe('http://localhost:3003/login');
    });

    it('should not redirect before 7 seconds have passed', async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      await submit('testuser', 'testpassword', mockSetMessage);
      await Promise.resolve();

      // Fast-forward time by 6 seconds (less than 7)
      jest.advanceTimersByTime(6000);

      // Assert - should not redirect yet
      expect(window.location.href).toBe('');

      // Fast-forward the remaining 1 second
      jest.advanceTimersByTime(1000);

      // Assert - should redirect now
      expect(window.location.href).toBe('http://localhost:3003/login');
    });
  });

  describe('Failed Registration', () => {
    it('should display error message on failed registration', async () => {
      // Arrange
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Username already exists' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      await submit('testuser', 'testpassword', mockSetMessage);
      await Promise.resolve();

      // Assert
      expect(mockAlert).toHaveBeenCalledWith('Username already exists');
      expect(mockSetMessage).not.toHaveBeenCalled();
    });

    it('should not redirect on failed registration', async () => {
      // Arrange
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Username already exists' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      await submit('testuser', 'testpassword', mockSetMessage);
      await Promise.resolve();

      // Fast-forward time by 7 seconds
      jest.advanceTimersByTime(7000);

      // Assert - should not redirect
      expect(window.location.href).toBe('');
    });

    it('should display alert with error message from server', async () => {
      // Arrange
      const errorMessage = 'Password is too weak';
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ message: errorMessage }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      await submit('testuser', 'weak', mockSetMessage);
      await Promise.resolve();

      // Assert
      expect(mockAlert).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('Network Error Handling', () => {
    it('should display generic error message on network failure', async () => {
      // Arrange
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      // Act
      await submit('testuser', 'testpassword', mockSetMessage);
      await Promise.resolve();

      // Assert
      expect(mockAlert).toHaveBeenCalledWith('Something went wrong');
      expect(mockSetMessage).not.toHaveBeenCalled();
    });

    it('should not redirect on network failure', async () => {
      // Arrange
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      // Act
      await submit('testuser', 'testpassword', mockSetMessage);
      await Promise.resolve();

      // Fast-forward time by 7 seconds
      jest.advanceTimersByTime(7000);

      // Assert - should not redirect
      expect(window.location.href).toBe('');
    });
  });

  describe('Delay Functionality', () => {
    it('should use setTimeout with exactly 7000ms delay', async () => {
      // Arrange
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      await submit('testuser', 'testpassword', mockSetMessage);
      await Promise.resolve();

      // Assert
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 7000);

      setTimeoutSpy.mockRestore();
    });

    it('should only set one timeout on successful registration', async () => {
      // Arrange
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      await submit('testuser', 'testpassword', mockSetMessage);
      await Promise.resolve();

      // Assert - should only call setTimeout once for redirection
      const timeoutCalls = setTimeoutSpy.mock.calls.filter(
        (call) => call[1] === 7000
      );
      expect(timeoutCalls.length).toBe(1);

      setTimeoutSpy.mockRestore();
    });
  });
});
