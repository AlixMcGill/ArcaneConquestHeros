namespace Backend.Tools;

public class Sanitizer
{
    public bool IsPasswordValid(string password)
    {
        if (password == "") return false;

        if (password.Length < 8) return false;

        char[] symbols = {'!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '.', 
            ':', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', 
            '{', '|', '}', '~', '©', '®', '™', '©', '°', '±', '÷', '×', '≈', 
            '≤', '≥', '√', '∑', '∫', '∞', '∂', '∇', '∈', '∉', '⊂', '⊃', '∩', 
            '∪', '⊥', '∠', '∧', '∨', '→', '←', '↔', '⇔', '⇑', '⇓', '⇐', '⇒', 
            '⇕', '⌐', '⌠', '⌡', '±', '×', '÷'};

        int symbolCount = 0;

        foreach (var c in password)
        {
            foreach (var symbol in symbols)
            {
                if (symbol == c) symbolCount++;
            }

            if (c == ' ') return false;
        }

        if (symbolCount < 1) return false;

        return true;
    }

    public bool CheckForInvalidCharacters(string text)
    {
        if (text == "") return false;

        char[] invalidCharacters = {'-', ';', '/'};

        foreach (var c in text)
        {
            foreach (var s in invalidCharacters)
            {
                if (c == s) return false;
            }
        }

        return true;
    }
}
