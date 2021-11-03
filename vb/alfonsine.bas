Attribute VB_Name = "alfonsine"
Private Sub CSV_Import()
Dim ws As Worksheet, strFile As String

Set ws = ActiveWorkbook.Sheets("PO Data") 'set to current worksheet name

strFile = Application.GetOpenFilename("Text Files (*.csv),*.csv", , "Please select text file...")

With ws.QueryTables.Add(Connection:="TEXT;" & strFile, Destination:=ws.Range("A1"))
     .TextFileParseType = xlDelimited
     .TextFileCommaDelimiter = True
     .Refresh
End With
End Sub

Private Sub RunScript(command As String)
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

End Sub

Sub Alfonsine()
    RunScript "cscript alfonsine.wsf"
End Sub
