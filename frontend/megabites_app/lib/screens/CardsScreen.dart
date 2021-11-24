import 'package:flutter/material.dart';

class CardsScreen extends StatefulWidget {
  @override
  _CardsScreenState createState() => _CardsScreenState();
}

class _CardsScreenState extends State<CardsScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.red,
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
        width: 400,
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
                      labelText: 'Search',
                      hintText: 'Search for a Card'),
                ),
              ),
              RaisedButton(
                  child: Text('Search',
                      style: TextStyle(fontSize: 14, color: Colors.black)),
                  onPressed: () {},
                  color: Colors.brown[50],
                  textColor: Colors.black,
                  padding: EdgeInsets.all(2.0),
                  splashColor: Colors.grey[100])
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
                      labelText: 'Add',
                      hintText: 'Add a Card'),
                ),
              ),
              RaisedButton(
                  child: Text('Add',
                      style: TextStyle(fontSize: 14, color: Colors.black)),
                  onPressed: () {},
                  color: Colors.brown[50],
                  textColor: Colors.black,
                  padding: EdgeInsets.all(2.0),
                  splashColor: Colors.grey[100])
            ]),
            Row(
              children: <Widget>[
                RaisedButton(
                    child: Text('Logout',
                        style: TextStyle(fontSize: 14, color: Colors.black)),
                    onPressed: () {
                      Navigator.pushNamed(context, '/login');
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
