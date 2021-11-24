import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue,
      body: MainPage(),
    );
  }
}

class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        width: 200,
        child: Column(
          mainAxisAlignment:
              MainAxisAlignment.center, //Center Column contents vertically,
          crossAxisAlignment:
              CrossAxisAlignment.center, //Center Column contents horizontal
          children: <Widget>[
            Row(children: <Widget>[
              Container(
                width: 200,
                child: TextField(
                  decoration: InputDecoration(
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(),
                      labelText: 'Login Name',
                      hintText: 'Enter Your Login Name'),
                ),
              ),
            ]),
            Row(children: <Widget>[
              Container(
                width: 200,
                child: TextField(
                  obscureText: true,
                  decoration: InputDecoration(
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(),
                      labelText: 'Password',
                      hintText: 'Enter Your Password'),
                ),
              ),
            ]),
            Row(
              children: <Widget>[
                RaisedButton(
                    child: Text('Do Login',
                        style: TextStyle(fontSize: 14, color: Colors.black)),
                    onPressed: () {
                      Navigator.pushNamed(context, '/cards');
                    },
                    color: Colors.brown[50],
                    textColor: Colors.black,
                    padding: EdgeInsets.all(2.0),
                    splashColor: Colors.grey[100])
              ],
            )
          ],
        ));
  }
}
