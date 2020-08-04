package com.xs;

class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length < 1) {
            return "";
        }
        StringBuffer result = new StringBuffer();
        int index = 0;
        String s;
        char c;
        while (index < strs[0].length()) {
            c = strs[0].charAt(index);
            for (int i = 0; i < strs.length; i++) {
                s = strs[i];
                if (index >= s.length() || c != s.charAt(index)) {
                    return result.toString();
                }
            }
            result.append(c);
            index++;
        }
        return result.toString();
    }
}