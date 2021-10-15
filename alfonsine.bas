Attribute VB_Name = "alfonsine"
Private Function RunScript(command As String) As String
    'run command
    Dim output As Object: Set output = CreateObject("WScript.Shell").exec(command).StdOut

    'handle the results as they are written to and read from the StdOut object
    Dim str As String
    Dim line As String
    
    While Not output.AtEndOfStream
        line = output.ReadLine
        If line <> "" Then str = str & line & vbCrLf
    Wend

    RunScript = str

End Function

Sub Alfonsine()
    MsgBox RunScript("cscript example.js")
End Sub
